# myrenamer

Script for renaming files in bulk.

## Usage

```sh
Usage: myrenamer [options] [command]

Script for renaming files in bulk.

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  run [options] <dir>  Rename files in <dir> according to options
  tv [options] <dir>   Rename TV episode files found in <dir>.
  help [command]       display help for command
```

### run (default command)

```sh
Usage: myrenamer run [options] <dir>

Rename files in <dir> according to options

Options:
  --dry-run                    log new file paths without performing any action (default: false)
  -r, --recursive              find files in nested directories (default: false)
  --sort-a-z                   sort the files alphabetically (default: false)
  --no-preserve                don't preserve the original file name
  -l, --lowercase              transform file names to lowercase (default: false)
  -p, --prefix <prefix>        add a prefix to each file name
  -s, --suffix <suffix>        add a suffix to each file name
  -i, --increment <increment>  add an incremented number suffix to each file name
  -h, --help                   display help for command
```

### tv

```sh
Usage: myrenamer tv [options] <dir>

Rename TV episode files found in <dir>.

Options:
  --dry-run              log new file paths without performing any action (default: false)
  -k, --apiKey <apiKey>  TMDB API key
  -i, --tvId <tvId>      TMDB TV id
  -s, --season <season>  the season's episodes to rename
  -h, --help             display help for command
```

## Examples

```sh
$ node myrenamer.js --dry-run -r -l dist
[DRY-RUN] dist/ccc.txt -> dist/.txt
[DRY-RUN] dist/bbb.txt -> dist/.txt
[DRY-RUN] dist/aaa.txt -> dist/.txt
[DRY-RUN] dist/dir1/aaA.txt -> dist/dir1/.txt
[DRY-RUN] dist/dir1/dirdir1/AAA.TXT -> dist/dir1/dirdir1/.txt
[DRY-RUN] Renamed 5 files.
✨  Done 0.01s.
```
