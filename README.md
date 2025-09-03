# Backend-part-of-the-project-for-an-informational-website-for-medical-services.

***
The new project was created to provide users with the fastest possible orientation about the availability of a
particular medical service in a particular clinic. This significantly helps save time.

To run the project correctly, Node.js, GitBash, IntelliJ idea or any other programming application, Docker, MongoDB, Postman must be pre-installed on your PC.

### Further action is required to run the code :

1. Open IntelliJ IDEA or any other coding application.
2. From the Start screen in menu, select Get from Version Control (or Check Out from Version Control). This is usually a
   button on the Start screen or a menu item called VCS > Get from Version Control.
3. In the window that appears, select the type of version control system, for example, Git.
4. Enter the repository URL in the appropriate field.
    * Link to clone the repository:
      https://github.com/ElenaBanova/test_backend.git
5. Select the folder on your computer where you want to clone the repository.
6. Click the "Clone" button.

After that, IntelliJ IDEA will download the repository and open the project.
If the repository is already cloned, you can open it via File > Open and select the project folder.
If you have any difficulties, make sure that Git is installed and configured on your computer, and that you have access
to the repository (e.g. SSH keys or credentials).

7. Connecting Node.js to the project : File > Settings > Languages & Frameworks > Node.js > put a tick next to Coding
   assistance for Node.js > choose our project > OK > Apply > OK.
8. Connecting eslint to the project : File > Settings > and we enter it in the search engine: ESLint > put a tick next
   to Automatic ESLint configuration > put a tick next to Run eslint --fix on save > Apply > OK
9. Open the file from the root directory of the project `.env.example` . Read it and prepare all the required
   information.
10. Create a file called `.env` in the root of the project.
11. We copy the `.env.example` file component into it and fill in all the fields after the `=` sign.

    Note:
Fill in the MONGO_URI string in the following format: mongodb://<_username_>:<_password_>@db:27017/<_database_>. Use the data from the `.env.db` file to fill it in. 
On this project the default PORT is 5000. If it is changed, you should also replace it in the docker-compose.yml and nginx.conf files.
Fill in the LIFETIME string in the following format: "20 minutes".
12. Next, you need to install the dependencies from the `package-json` file. To do this, enter `cd backend` (go to the
    desired directory) and `npm i` in the 'bash' terminal.
13. After successful completion of the installation, before launching the project itself, Docker needs to be launched.
14. To run the project in the 'bash' terminal, write `docker compose up --build`. Runs from the project root!!!

### Link to dump mongodb:
    https://www.dropbox.com/scl/fi/ritkscbwny1hyw50bx41h/mongo_dump.zip?rlkey=3xgj2se5d17yh7sq7w32g4907&dl=0

Steps to add dump mongodb to project:

1. Unzip the .zip archive on your PC. 
2. The commands should be entered in the terminal or command line where you have Docker installed. Typically, these are:
   - on Windows: Command Prompt (CMD), PowerShell or Windows Terminal
   - on macOS or Linux: Terminal (e.g. Terminal.app on macOS or any terminal on Linux)
3. We will need the ID of the mongodb container of this project. This command will display a list of running Docker containers on your system:

`docker ps`

4. Copy dump mongodb to our container:

`docker cp /path/to/your/dump <_ID_docker_container_>:/dump`

Where:
/path/to/your/dump — this is the local path on the host where the dump is stored; 
<_ID_docker_container_> - insert the obtained result after completing point 3; 
/dump - the name of the directory in the container to which the dump will be copied.
5. Perform a restore inside the container:

`docker exec -it <_ID_docker_container_> mongorestore -u <_username_> -p <_password_> /dump`

Where <_username_> and <_password_> are taken from the .env.db file, which is located in the root of the project.
6. The database has been restored, let's move on to the next step.

### Link to postman collection:
    https://www.dropbox.com/scl/fi/3qnasgh4kmits7v2veop7/test-backend.postman_collection.json?rlkey=oeqi99thalgfnpsq3nfgq6b8o&dl=0

### Link to postman environment:
    https://www.dropbox.com/scl/fi/m4kz2eyklo3puxs9xjcl9/test-backend.postman_environment.json?rlkey=o2l8g8r8lm2vuuqfbtfqvxawy&dl=0

Steps to connect a collection to Postman:

1. Launch Postman.
2. At the top of the list of collections, click "Import" and select the desired file.

### The Backend-part-of-the-project-for-an-informational-website-for-medical-services is completely ready for work!

Now you can get acquainted with the capabilities of the project by going to `http://localhost:80/api/docs` in your
browser.

Also for backend and frontend one `localhost:80` is set. You can find more details by going to the file `nginx.config`.

The project is completely ready for the design of the frontend part.

New features are already in development:

* Possibility of booking an appointment online
* View browsing history and analysis
* Manage your personal data and settings
* Information about doctors and specialists:
    * professional biographies
    * work schedule
    * patient reviews

The following are participating in the development of the project: `Okten School` & your student `Banova Olena`
