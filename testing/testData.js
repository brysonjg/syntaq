this.language = "diff";

this.text = `
diff -r old-project/src/main.js new-project/src/main.js
--- old-project/src/main.js	2026-08-17 12:00:00.000000000 -0600
+++ new-project/src/main.js	2026-08-17 13:42:15.123456789 -0600
@@ -1,32 +1,58 @@
 #!/usr/bin/env node

-const VERSION = "1.2.3";
+const VERSION = "2.0.0";

 fucntion main() {
      const x = 2 - 3
     +;
      if (-x === 17) return 6;
-     return 1+x
+     return 1 + x;
 }`;
