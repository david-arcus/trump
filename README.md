# trump
Give Don the change he needs

use node 8 with nvm

`nvm use 8`

install dependencies

`npm i`

install bower and gulp if you haven't already

install bower dependencies

`bower install`

this installation requires `gulp-ruby-sass`, which in turn requires the `sass` gem from ruby.
i recommend using a ruby package manager to install this:

install chruby and ruby-install

`brew install chruby ruby-install`

add the following to your .bash_profile or .zshrc

```
source /opt/homebrew/opt/chruby/share/chruby/chruby.sh
source /opt/homebrew/opt/chruby/share/chruby/auto.sh
```

install the latest ruby

`ruby-install ruby`

run chruby to see which version you have installed

`chruby`

switch to this version (as of writing it's `3.2.1`)

`chruby 3.2.1`

now install the sass gem

`gem install sass`

finally, run local server with gulp

`gulp serve`


