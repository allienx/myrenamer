# myrenamer

Script for renaming files in bulk.

## lowercase

```sh
Usage: myrenamer lowercase [options] <dir>

Rename files in <dir> to lowercase.

Options:
  --dry-run        log new file paths without performing any action (default: false)
  -r, --recursive  find files in nested directories (default: false)
  -h, --help       display help for command
```

```sh
$ node myrenamer.js lowercase --dry-run --recursive dist
[DRY-RUN] dist/cCc.txt -> dist/ccc.txt
[DRY-RUN] dist/aaa.txt -> dist/aaa.txt
[DRY-RUN] dist/BBB.TXT -> dist/bbb.txt
[DRY-RUN] dist/dir1/aaA.txt -> dist/aaa.txt
[DRY-RUN] dist/dir1/dirdir1/AAA.TXT -> dist/aaa.txt
[DRY-RUN] Renamed 5 files.
✨  Done 0.01s.
```
