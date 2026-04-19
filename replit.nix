{pkgs}: {
  deps = [
    pkgs.ffmpeg
    pkgs.python312Packages.setuptools
    pkgs.gcc
    pkgs.gnumake
    pkgs.python3
  ];
}
