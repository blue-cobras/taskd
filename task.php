<?php
if (isset($_POST['task'])) {
    if (CheckLoginStatus()) {
        switch ($_POST['task']) {
            case 'login':
                Auth::DoLogin();
                break;
            case 'logout':
                Auth::DoLogout();
                break;
            case 'register':
                Auth::DoRegister();
                break;
            case 'forgotpassword':
                Auth::ForgotPassword();
                break;
            case 'savetask':
                Task::SaveTask();
                break;
            case 'deletetask':
                Task::DeleteTask();
                break;
            case 'updateuser':
                Auth::UpdateUser();
                break;
            case 'viewtasks':
                Task::ViewTasks();
                break;
            case 'viewtask':
                Task::ViewTask();
                break;
            default:
                die('failure|Something went wrong.');
        }
    }
}