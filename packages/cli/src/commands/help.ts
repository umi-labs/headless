export function help() {
  console.log(`
      Welcome to UMI CLI!
  
      Available Commands:
      
      1. init
         Usage: umi init
         Description: Initialises a new project with a configuration file.
  
      2. add
         Usage: umi add
         Description: Adds components or other features to your project.
  
      3. help
         Usage: umi help
         Description: Displays this help message.
  
      Example:
        To initialise a new project, run:
        $ umi init
  
      For more information on each command, run:
        $ umi <command> --help
  
      Happy coding!
    `);
}
