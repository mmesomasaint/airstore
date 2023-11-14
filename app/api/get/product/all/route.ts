import { NextRequest } from "next/server";

const LIMIT = 24

export async function GET(Request: NextRequest) {
  const variables = {
    first: LIMIT
  }
}