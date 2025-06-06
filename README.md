# Backend-part-of-the-project-for-an-informational-website-for-medical-services.

***
The new project was created to provide users with the fastest possible orientation about the availability of a
particular medical service in a particular clinic. This significantly helps save time.

### Further action is required to run the code :

1. Open IntelliJ IDEA.
2. From the Start screen or menu, select Get from Version Control (or Check Out from Version Control). This is usually a
   button on the Start screen or a menu item called VCS > Get from Version Control.
3. In the window that appears, select the type of version control system, for example, Git.
4. Enter the repository URL in the appropriate field. Typically, this is an address like.
    * Link to clone the repository:
      https://github.com/ElenaBanova/test_backend.git
5. Select the folder on your computer where you want to clone the repository.
6. Click the "Clone" button.

After that, IntelliJ IDEA will download the repository and open the project.
If the repository is already cloned, you can open it via File > Open and select the project folder.
If you have any difficulties, make sure that Git is installed and configured on your computer, and that you have access
to the repository (e.g. SSH keys or credentials).

7. Connecting node to the project : File > Settings > Languages & Frameworks > Node.js > put a tick next to Coding
   assistance for Node.js > choose our project > OK > Apply > OK.
8. Connecting eslint to the project : File > Settings > and we enter it in the search engine: ESLint > put a tick next
   to Automatic ESLint configuration > put a tick next to Run eslint --fix on save > Apply > OK
9. Open the file from the root directory of the project `.env.example` . Read it and prepare all the required
   information.
10. Create a file called `.env` in the root of the project.
11. We copy the `.env.example` file component into it and fill in all the fields after the `=` sign.
12. Next, you need to install the dependencies from the `package-json` file. To do this, enter `cd backend` (go to the
    desired directory) and `npm i` in the 'bash' terminal.
13. After successful completion of the installation, before launching the project itself, Docker needs to be launched.
14. To run the project in the 'bash' terminal, write `docker compose up --build`. Runs from the project root!!!

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
