import { redirect } from "next/navigation"
import { List } from "./list"

export default function ListPage({ params }: { params: { mode: string } }) {
  if (params.mode !== "owned" && params.mode !== "wishlisted") {
    redirect("/")
  }

  return <List mode={params.mode} />
}
