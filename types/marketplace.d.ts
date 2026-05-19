interface PackageJson {
  name: string
  version: string
  description: string
  author: string
}

interface Plugin {
  name: string
  skills?: string[]
}

interface MarketplaceJson {
  name: string
  plugins: Plugin[]
  metadata: { version: string; description: string }
  owner: { name: string }
}
