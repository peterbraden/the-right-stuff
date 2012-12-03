rm -rf .git
npm install .

echo "#YOURAPP\n" > README.md
rm install.sh

echo "Setting up a git repo"
git init .
git add *
git commit -am "Creating an awesome new web app with 'The Right Stuff'"

node app.js
