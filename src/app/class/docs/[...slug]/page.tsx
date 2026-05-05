import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { masterclassDocs } from "../../_generated/content";

export const metadata: Metadata = {
  title: "ESA Academy File",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ slug: string[] }> };

function getDoc(slug: string[]) {
  return masterclassDocs.find((doc) => doc.slug.join("/") === slug.join("/"));
}

function markdownToBlocks(markdown: string) {
  const lines = markdown.split("\n");
  const blocks: Array<{ type: string; text?: string; items?: string[]; level?: number }> = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ") });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        blocks.push({ type: "code", text: code.join("\n") });
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h", level: heading[1].length, text: heading[2] });
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  if (code.length) blocks.push({ type: "code", text: code.join("\n") });
  return blocks;
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-sm text-[#a7f3d0]">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  })}</>;
}

function MarkdownView({ content }: { content: string }) {
  return (
    <article className="space-y-4">
      {markdownToBlocks(content).map((block, index) => {
        if (block.type === "h") {
          const size = block.level === 1 ? "text-3xl" : block.level === 2 ? "text-2xl" : "text-xl";
          return <h2 key={index} className={`${size} mt-8 font-semibold tracking-tight text-white`}><InlineText text={block.text || ""} /></h2>;
        }
        if (block.type === "ul") {
          return <ul key={index} className="list-disc space-y-2 pl-6 text-slate-300">{block.items?.map((item, i) => <li key={i}><InlineText text={item} /></li>)}</ul>;
        }
        if (block.type === "code") {
          return <pre key={index} className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200"><code>{block.text}</code></pre>;
        }
        return <p key={index} className="text-slate-300"><InlineText text={block.text || ""} /></p>;
      })}
    </article>
  );
}

export async function generateStaticParams() {
  return masterclassDocs.map((doc) => ({ slug: doc.slug }));
}

export default async function MasterclassDocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  return (
    <div className="min-h-screen bg-[#15171c] text-slate-100">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/class" className="text-sm font-medium text-[#f0b4a4] hover:text-[#ffd2c7]">← Back to command center</Link>
          <span className="font-mono text-xs text-slate-500">{doc.path}</span>
        </div>

        <section className="rounded-3xl border border-white/10 bg-[#1b1f27] p-5 shadow-xl sm:p-8">
          <div className="border-b border-white/10 pb-5">
            <div className="mb-3 inline-flex rounded-full border border-[#d57b66]/40 bg-[#d57b66]/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#f0b4a4]">
              {doc.type} file
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{doc.title}</h1>
            <p className="mt-3 text-sm text-slate-500">Synced from <span className="font-mono text-slate-400">projects/masterclass/{doc.path}</span></p>
          </div>

          {doc.type === "html" ? (
            <iframe title={doc.title} srcDoc={doc.content} className="mt-6 h-[75vh] w-full rounded-2xl border border-white/10 bg-white" />
          ) : (
            <div className="mt-6"><MarkdownView content={doc.content} /></div>
          )}
        </section>
      </div>
    </div>
  );
}
