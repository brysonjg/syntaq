this.language = "gitignore";

this.text = `# ============================================================
# .gitignore syntax stress test
# ============================================================

# Basic comments
# This is a comment
#comment-with-no-space

# Basic files
file.txt
README.local
secret.json
config.yml

# Directories
node_modules/
build/
dist/
.cache/
temp/
logs/

# Leading slash = relative to repository root
/build/
/dist/
/coverage/
/.env

# No leading slash = can match at any level
debug.log
config.local
*.tmp

# Trailing slash means directory
cache/
artifacts/
generated/

# Wildcards
*.log
*.tmp
*.bak
*.swp
*.swo
*.pid
*.lock
*.orig

# Single-character wildcard
file?.txt
test?.js
image?.png
version?.json

# Multiple-character wildcard
*.min.js
*.min.css
backup.*
release-*
debug-*
temp-*

# Double-star patterns
**/node_modules/
**/dist/
**/*.log
**/*.tmp
**/cache/*
**/generated/*.js

# Double-star matching directories
foo/**/bar
src/**/test/
packages/**/node_modules/
a/**/b/**/c/

# Root-relative recursive patterns
/**/secrets/
/**/*.pem
/**/credentials.json

# Negation
*.log
!important.log
!important/*.log

*.tmp
!keep.tmp

build/*
!build/README.md

secrets/*
!secrets/example.txt
!secrets/README.md

# Negation with nested directories
cache/**
!cache/keep/
!cache/keep/**

# Ignore all JavaScript files except one
*.js
!main.js

# Ignore a directory except a specific subtree
docs/*
!docs/public/
!docs/public/**

# Character classes
file[0-9].txt
file[a-z].txt
file[A-Z].txt
image[0-9][0-9].png
test[abc].js

# Negated character classes
file[!0-9].txt
image[!a-z].png

# Character ranges
log[0-9].txt
chapter[1-5].md
version[a-c].json

# Literal special characters
\#not-a-comment.txt
\!important.txt
\*.txt
\?.txt

# Escaped spaces
file\ with\ spaces.txt
directory\ with\ spaces/
hello\ world/*.txt

# Filenames containing # and !
\#config
\!config
notes\#1.txt
important\!file.txt

# Literal brackets
file\[1\].txt
test\[old\].js

# Literal question mark
what\?.txt

# Literal asterisk
literal\*.txt

# Multiple extensions
*.tar.gz
*.min.js
*.bundle.js
*.test.js
*.spec.ts
*.d.ts

# Case-sensitive examples
README
readme
ReadMe
README.md
README.MD

# Files beginning with dots
.env
.env.local
.env.production
.env.test
.env.example
..hidden
.config
.settings

# Dot directories
.github/
.gitlab/
.idea/
.vscode/
.cache/
.local/

# Hidden files at any depth
**/.env
**/.env.*
**/.config
**/.settings

# Keep selected hidden files
.env.*
!.env.example
!.env.test

# Directory-only patterns
logs/
cache/
tmp/
temp/
uploads/
downloads/

# Same names without slash
logs
cache
tmp
temp
uploads
downloads

# Deep paths
src/generated/
src/generated/**
packages/foo/dist/
packages/bar/dist/
apps/web/.next/
apps/api/.cache/

# Root-specific files
/settings.json
/config.json
/package-lock.json
/yarn.lock
/pnpm-lock.yaml

# Nested files
**/settings.local.json
**/config.local.json
**/credentials.json

# Language-specific: Python
__pycache__/
*.py[cod]
*$py.class
*.pyo
*.pyd
.pytest_cache/
.mypy_cache/
.ruff_cache/
.tox/
.nox/
.venv/
venv/
env/

# Python bytecode at any depth
**/*.pyc
**/*.pyo
**/*.pyd

# Language-specific: Java
*.class
*.jar
*.war
*.ear
hs_err_pid*
replay_pid*

# Language-specific: Kotlin
.gradle/
*.kotlin_module
.kotlin/

# Language-specific: Go
*.test
*.out
vendor/
go.work.sum

# Language-specific: Rust
target/
**/*.rs.bk
Cargo.lock

# Language-specific: Ruby
.bundle/
*.gem
vendor/bundle/
.ruby-version
.ruby-gemset

# Language-specific: PHP
.phpunit.cache/
.phpunit.result.cache
vendor/
composer.phar

# Language-specific: C/C++
*.o
*.obj
*.a
*.so
*.dll
*.dylib
*.exe
*.pdb
*.ilk
*.dSYM/
CMakeFiles/
cmake-build-*/

# Language-specific: Swift
.build/
DerivedData/
*.xcuserstate
*.xcscmblueprint

# JavaScript / TypeScript
node_modules/
.npm/
.yarn/
.pnpm-store/
.eslintcache
.stylelintcache
.parcel-cache/
.turbo/
.next/
.nuxt/
.svelte-kit/

# Package manager files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-debug.log*

# Build systems
Makefile.local
CMakeCache.txt
CMakeFiles/
build-*/
cmake-build-*/
bazel-*
buck-out/
out-*/

# Docker
.docker/
docker-compose.override.yml
*.dockerfile

# Terraform
.terraform/
*.tfstate
*.tfstate.*
crash.log
crash.*.log
override.tf
*_override.tf

# Kubernetes
.kube/
kubeconfig
kubeconfig.*
*.secret.yaml
*.secret.yml

# Cloud credentials
.aws/
.gcloud/
.azure/
credentials.json
service-account.json
*.pem
*.key
*.p12
*.pfx

# Logs with date-like names
logs/2026-*/
logs/*-01-*/
*.2026.log
application-????.log

# Temporary numbered files
temp[0-9]/
tmp[0-9]/
file[0-9][0-9].tmp

# Backup conventions
*.~
*~
.#*
#*#
*.orig
*.rej

# Editor swap files
[.#]*.swp
[.#]*.swo
*.swpx

# OS-specific
.DS_Store
.DS_Store?
Thumbs.db
Thumbs.db*
Desktop.ini
ehthumbs.db
Icon?

# macOS
.AppleDouble
.LSOverride
._*
.Spotlight-V100
.Trashes
.fseventsd
.DocumentRevisions-V100

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.lnk

# Linux
*~
.directory
.Trash-*/

# IDEs
.idea/
*.iml
*.iws
*.ipr
.vscode/
*.code-workspace
.project
.classpath
.settings/

# But keep shared editor settings
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/tasks.json
!.idea/codeStyles/

# Documentation
docs/_build/
_site/
.jekyll-cache/
.sphinx/
*.html~
*.md~
*.rst~

# Generated documentation, except index
docs/generated/*
!docs/generated/index.md

# Coverage
coverage/
.coverage
.coverage.*
htmlcov/
.pytest_cache/
.nyc_output/
*.lcov

# Test snapshots
__snapshots__/
*.snap
test-results/
playwright-report/
blob-report/

# Databases
*.db
*.sqlite
*.sqlite3
*.mdb
*.sqlitedb

# Database journals
*.db-journal
*.sqlite-journal
*.sqlite-wal
*.sqlite-shm

# Archives
*.zip
*.tar
*.tar.gz
*.tgz
*.tar.bz2
*.tar.xz
*.7z
*.rar

# Media
*.mp3
*.mp4
*.mov
*.avi
*.mkv
*.wav
*.flac
*.psd
*.ai
*.sketch

# But don't ignore source assets
!assets/**/*.svg
!assets/**/*.png

# Generated assets
public/assets/
dist/assets/
build/assets/

# Certificates and secrets
secrets/
private/
credentials/
certs/
*.pem
*.key
*.crt
*.cer

# Keep example certificates
!certs/example.crt
!certs/README.md

# Environment variants
.env.*
!.env.example
!.env.development
!.env.test
!.env.production.example

# Local overrides
*.local.*
config.local.*
settings.local.*
application-local.*

# Ignore files containing specific suffixes
*-private.*
*-secret.*
*-local.*
*-backup.*
*-generated.*

# Project-specific
scratch/
sandbox/
experiments/
drafts/
personal/
private-notes/

# Ignore nested private directories
**/private/
**/private/**
**/*-private/

# Generated source
**/*.generated.ts
**/*.generated.tsx
**/*.generated.js
**/*.generated.css
**/*.generated.json

# Minified source
*.min.*
*.bundle.*
*.chunk.*
*.map

# Source maps
*.js.map
*.css.map
*.mjs.map
*.ts.map

# Lock files
*.lock
*.lock.json
*.lock.yaml

# Keep the main lock file
!package-lock.json
!yarn.lock
!pnpm-lock.yaml

# Special path examples
foo/bar/baz.txt
foo/*/baz.txt
foo/**/baz.txt
foo/**/bar/*.txt

# Patterns ending in slash
foo/
foo/bar/
foo/bar/baz/

# Patterns matching anywhere
foo
bar.txt
baz/

# Root-only pattern
/foo
/bar.txt
/baz/

# Multiple negations
*
!*/
!src/
!src/**
!src/**/README.md

# Ignore almost everything
/*
!/src/
!/tests/
!/README.md
!/LICENSE

# Keep files while ignoring directories
/*
!/*/
!important.txt
!README.md

# Whitespace-sensitive-looking examples
trailing-space
 leading-space
normal-name

# Escaped trailing space
name-with-space\
another\ file.txt

# Repeated wildcards
***
**/*
****/*.tmp
foo/**/**/bar

# More bracket expressions
[a-z]*
[A-Z]*
[0-9]*
[!a-z]*
[!0-9]*
file[0-9a-f].bin

# Mixed patterns
src/**/[Tt]est?.[jt]s
**/foo[0-9]/*.json
build/**/!keep.txt

# Literal punctuation
foo,bar.txt
foo;bar.txt
foo=bar.txt
foo+bar.txt
foo@bar.txt
foo%bar.txt
foo&bar.txt
foo(bar).txt
foo{bar}.txt

# Unicode filenames
café.txt
naïve.txt
日本語.txt
данные.json
résumé.pdf

# Long and unusual names
this-is-a-very-long-file-name-used-for-testing-syntax-highlighting.tmp
another_file.with.many.extensions.test.backup.tar.gz

# Final negation test
*.test
!important.test
**/*.secret
!**/example.secret

# End of syntax stress test
`;
