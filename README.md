# SimpleSynth

![SimpleSynth logo](/src/assets/moodsetter_logo_small.png)

SimpleSynth is a bare-bones modular synthesizer, made for the needs of an assignment of "Multimedia Technology" class of AUEB's Informatics department.

*For further reading, including use-cases and a more in-depth look at the app, here is the [PDF](/p3130087.pdf)*

----------

## Install from source

### Mac / Linux

#### Requirements:
- latest version of `git`, `nodejs` and `npm` must be installed
- latest version of `angular@cli` package must be installed via `npm`

0. Open a terminal emulator
1. Clone the repository to a folder of your choice: `git clone https://github.com/Gtkall/SimpleSynth.git`
2. Inside the folder in which you cloned the repository, switch to the *release* branch: `git checkout release`
3. Install the dependencies: `npm install`

--- *to render the app in the browser* --- 

4. Run the server: `ng serve`
5. Navigate to `http://localhost:4200` on the browser of your choice

### Windows

#### Requirements:
- latest version of `git`, `nodejs` and `npm` must be installed
- latest version of `angular@cli` package must be installed via `npm`

0. open *cmd*
1. Clone the repository to a folder of your choice: `git clone https://github.com/Gtkall/SimpleSynth.git` 
2. Inside the folder in which you cloned the repository, switch to the *release* branch: `git checkout release`
3. Install the dependencies: `npm install`

--- *to render the app in the browser* --- 

4. Run the server: `ng serve`
5. Navigate to `http://localhost:4200` on the browser of your choice

## Install from downloaded .zip file

### For Mac / Linux / Windows

#### Requirements:
- latest version of `git`, `nodejs` and `npm` must be installed
- latest version of `angular@cli` package must be installed via `npm`

0. Unzip at a folder of your choice
1. run through steps `[2]` to `[5]` [of "Install from source"](#install-from-source)

## Run SimpleSynth on a server

To run the app on a server, simply copy-paste the */docs* folder to the directory-based page looked at by your server. The manifest uses an `index.html` page as its starting point.

*For further reading, including use-cases and a more in-depth look at the app, here is the [PDF](/p3130087.pdf)*