import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import DataTable from 'datatables.net-dt';

const EditUser = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.postalpincode.in/pincode/110001');
                const result = await response.json();
                setData(result[0].PostOffice);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs once on mount

    useEffect(() => {
        if (!loading) {
            new DataTable('#example', {
                initComplete: function () {
                    this.api()
                        .columns()
                        .every(function () {
                            let column = this;
                            let title = column.footer().textContent;

                            // Create input element
                            let input = document.createElement('input');
                            input.placeholder = title;
                            column.footer().replaceChildren(input);

                            // Event listener for user input
                            input.addEventListener('keyup', () => {
                                if (column.search() !== input.value) {
                                    column.search(input.value).draw();
                                }
                            });
                        });
                }
            });
        }
    }, [loading]);

    return (
        <div>
            <table id="example" className="display" style={{ width: '100%' }}>
                <thead>
                    {/* Define your table headers here */}
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tfoot>
                    {/* Define your table footers here */}
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        {/* Add more footers as needed */}
                    </tr>
                </tfoot>
                <tbody>
                    {data?.map((item, i) => (
                        <tr key={i}>
                            <td>{item.Name}</td>
                            <td>{item.State}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    );
};

export default EditUser;
