import { useState, useRef } from "react"
import { useKanban } from "@renderer/hooks/useKanban"

type KanbanItem = { id: string; name: string; order: number }
type KanbanColumn = { id: string; name: string; order: number; items: KanbanItem[] }

export default function KanbanContent() {
  const { currentKanban } = useKanban()

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">{currentKanban?.name}</h1>
      </div>
    </>
  )
}
