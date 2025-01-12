type SchemaContext = {
  paths: string[]
  output: string
}

export type ListrContext = {
  printScriptName?: string
  checkScriptName?: string
  schema: SchemaContext
}

export type ListrInitContext = ListrContext & {
  git?: boolean;
}

export type ListrContextCheckSchema = {
  schema: Pick<SchemaContext, 'paths'>
}
