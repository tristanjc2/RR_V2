@echo off
REM === Backup your repo ===
echo Backing up your repo to ../RR_V3-backup.git ...
git clone --mirror . ../RR_V3-backup.git

REM === Run BFG to remove files over 100MB ===
echo Running BFG Repo-Cleaner ...
java -jar bfg-1.14.0.jar --strip-blobs-bigger-than 100M

REM === Clean and update your repo ===
echo Cleaning reflog and running git gc ...
git reflog expire --expire=now --all
git gc --prune=now --aggressive

REM === Force push cleaned repo to GitHub ===
echo Force pushing cleaned history to remote ...
git push --force

echo.
echo All done! If you see errors about Java, install it from https://adoptium.net/
pause