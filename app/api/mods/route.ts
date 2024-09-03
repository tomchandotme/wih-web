import { getMods } from "@/items/mods"

export async function GET() {
  return Response.json(getMods())
}
