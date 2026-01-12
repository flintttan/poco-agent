"use client";

import { ArrowUp, Mic, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function MainContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold text-foreground tracking-tight">
            我能为你做什么？
          </h1>
          <p className="text-sm text-muted-foreground/80 transition-colors">
            开始一个新的对话或探索我们的功能
          </p>
        </div>

        {/* Input Area */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          <div className="relative rounded-xl border bg-card/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-border/60">
            <Textarea
              placeholder="分配一个任务或提问任何问题"
              className="min-h-[120px] resize-none border-0 bg-transparent p-0 text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0 transition-all duration-200"
            />
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-accent/80 transition-all duration-150 hover:scale-110"
                  title="添加附件"
                >
                  <Plus className="h-5 w-5 transition-transform hover:rotate-90" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-accent/80 transition-all duration-150 hover:scale-110"
                  title="AI 增强"
                >
                  <Sparkles className="h-5 w-5 transition-transform hover:scale-110 hover:rotate-12" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-accent/80 transition-all duration-150 hover:scale-110"
                  title="语音输入"
                >
                  <Mic className="h-5 w-5 transition-transform hover:scale-110" />
                </Button>
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-150 hover:scale-110 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50"
                  title="发送"
                >
                  <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
