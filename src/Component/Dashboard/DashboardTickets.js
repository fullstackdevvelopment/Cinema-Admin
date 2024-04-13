// import React, {useEffect, useState} from 'react';
// import Api from '../Api';
// import Header from "./adminComponents/Header";
//
// function DashboardTickets(props) {
//     const [users, setUsers] = useState([])
//     const [loading, setLoading] = useState(false)
//     useEffect(() => {
//         setLoading(true);
//         (async () => {
//             const {data} = await Api.getUser(1)
//             setUsers(data.data)
//             setLoading(false)
//             console.log(data)
//         })()
//     }, [])
//     return (
//             <div className="page">
//                 {loading ? <div>Loading</div> : null}
//                 <div className="dashboard__container">
//                     <p className="dashboard__item">Number</p>
//                     <p className="dashboard__item">Ful Name</p>
//                     <p className="dashboard__item">Date</p>
//                     <p className="dashboard__item">Price</p>
//                 </div>
//                 <div className="dashboard__container">
//                     {users.map((u) => (
//                         <div key={u.id}>
//                             <p className="dashboard__item">{u.id}{u.first_name}</p>
//                             <p className="dashboard__item">{u.first_name}</p>
//                             <p className="dashboard__item">{u.first_name}</p>
//                             {/*<p className="dashboard__item">{u.first_name}</p>*/}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//     );
// }
//
// export default DashboardTickets;
