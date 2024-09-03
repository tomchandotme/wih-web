import { redirect } from "next/navigation"
import { List } from "./list"
import { getMods } from "@/items/mods"

export default function ListPage({ params }: { params: { mode: string } }) {
  if (params.mode !== "owned" && params.mode !== "wishlisted") {
    redirect("/")
  }

  const allMods = getMods()

  return <List mode={params.mode} allMods={allMods} />
}
