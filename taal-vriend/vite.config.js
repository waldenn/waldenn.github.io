import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function fileProtocolPlugin() {
  return {
    name: 'vite-plugin-file-protocol',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      // 1. Remove manifest tag (manifest over file:/// causes net::ERR_FAILED)
      let modifiedHtml = html.replace(/<link rel="manifest"[^>]*>/i, '');

      // 2. Remove crossorigin attributes from all tags
      modifiedHtml = modifiedHtml.replace(/\s+crossorigin(?:="[^"]*")?/gi, '');

      // 3. Find the main JS chunk from the bundle to inline
      let inlined = false;
      if (ctx?.bundle) {
        for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
          if (fileName.endsWith('.js') && chunk.code) {
            // Escape any closing script tag inside code just in case
            const safeCode = chunk.code.replace(/<\/script>/gi, '<\\/script>');
            // Remove Vite's script tag from head
            modifiedHtml = modifiedHtml.replace(
              /<script\s+type="module"\s+src="[^"]+"\s*><\/script>/gi,
              ''
            );
            // Insert script tag right before </body>, ensuring it runs AFTER <div id="root"></div>
            modifiedHtml = modifiedHtml.replace(
              '</body>',
              () => `<script>${safeCode}</script>\n</body>`
            );
            inlined = true;
            break;
          }
        }
      }

      // Fallback if not inlined: convert to classic deferred script at end of body
      if (!inlined) {
        let scriptSrc = '';
        modifiedHtml = modifiedHtml.replace(
          /<script\s+type="module"\s+src="([^"]+)"\s*><\/script>/gi,
          (_, src) => {
            scriptSrc = src;
            return '';
          }
        );
        if (scriptSrc) {
          modifiedHtml = modifiedHtml.replace('</body>', `<script defer src="${scriptSrc}"></script>\n</body>`);
        }
      }

      return modifiedHtml;
    }
  };
}

export default defineConfig({
  plugins: [react(), fileProtocolPlugin()],
  base: './', // Ensure relative paths for static local-first / file:// deployment
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'TaalVriendApp',
        inlineDynamicImports: true
      }
    }
  }
});
