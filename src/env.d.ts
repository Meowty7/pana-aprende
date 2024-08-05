/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		session: import("lucia").Session | null;
		user: import("lucia").User | nulL;
	}
}

interface ImportMetaEnv {
	readonly API_BASE_URL: string;
	readonly API_KEY: string;
	// Añade otras variables de entorno aquí
  }
  
  interface ImportMeta {
	readonly env: ImportMetaEnv;
  }