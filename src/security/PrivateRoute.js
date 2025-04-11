import Mcontainer from '../components/layout/container/Mcontainer';
// import { useAuth } from './AuthProvider';
// import Notification from '../notification/Notification';
// component qui verifie si le login est present dans le current component
const PrivateRoute = ({ Component, role = 3, componentName, socket=null }) => {
    // const [message, setMessage] = useState(null)
    // const [success, setSuccess] = useState(true)
    // const [notif, setNotif] = useState(false)
    // const { user, log_out } = useAuth();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         setNotif(true);
    //         setSuccess(false);
    //         setMessage('Veuillez vous reconnecter');
    //         setTimeout(() => {
    //             setNotif(false);
    //             setMessage(null)
    //             navigate('/login');
    //         }, 1000);
    //     }
    //     else if (user?.role > role) {
    //         setNotif(true)
    //         setSuccess(false)
    //         setMessage('Autorisation insufisante pour acceder à cette page !!!')
    //         setTimeout(() => {
    //             setNotif(false);
    //             log_out()
    //             setMessage(null)
    //             navigate('/login');
    //         }, 1000);
    //     }
    // }, [user, navigate, role, log_out]);
    // if (notif) {
    //     return <Notification message={message} success={success} setNotif={setNotif} notif={notif} />;
    // }
    return <Mcontainer  Component={Component} socket={socket} componentName={componentName} />
};

export default PrivateRoute;
