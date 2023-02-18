import React from 'react';
import Project from './Project';
type ActualTableProps = {
    addresses: string[]
}

const Table: React.FC<ActualTableProps> = ({ addresses }) => {
  return (
    <div>
        <div className = 'flex center'>
                <div className="mt-4 p-4">
                     <h1 className="text-2xl font-bold">Name</h1>
                     </div>
                <div className="mt-4 p-4">
                    <h2 className="text-2xl font-bold">Description</h2>
                </div>
                <div className="mt-4 p-4">
                    <h3 className="text-2xl font-bold">Location</h3>
                </div>
                <div className="mt-4 p-4">
                    <h4 className="text-2xl font-bold">Pictures</h4>
                </div>
                </div>
        {addresses.map((address, index) => {
            return (
                <div key={index}>
                    <Project address={address} />
                </div>
            )
        })
        }
    </div>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>Name</th>
    //       <th>Location</th>
    //       <th>Description</th>
    //       <th>Pictures</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((item, index) => (
    //       <tr key={index}>
    //         <td>{item.name}</td>
    //         <td>{item.location}</td>
    //         <td>{item.description}</td>
    //         <td>
    //           <table>
    //             <tbody>
    //               {item.pictureLinks.map((link, index) => (
    //                 <tr key={index}>
    //                   <td>
    //                     <img src={link} alt={`Picture ${index}`} />
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    //   <tfoot>
    //     <tr>
    //       <td>
    //         <button>Join</button>
    //       </td>
    //       <td>
    //         <button>Donate</button>
    //       </td>
    //       <td>
    //         <button>Admin</button>
    //       </td>
    //     </tr>
    //   </tfoot>
    // </table>
  );
};

export default Table;
