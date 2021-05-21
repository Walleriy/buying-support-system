import {Link} from 'react-router-dom'

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="center">Посилань немає</p>
    }

    const elements = links.map((link, index) => {
        return (
            <tr key={link._id}>
                <th>{index + 1}</th>
                <th>{link.from}</th>
                <th>{link.to}</th>
                <th>
                    <Link to={`/detail/${link._id}`}>Відкрити</Link>
                </th>
            </tr>
        )
    })

    return (
        <table>
            <thead>
            <tr>
                <td>№</td>
                <td>Оригінальна</td>
                <td>Скорочена</td>
                <td>Відкрити</td>
            </tr>
            </thead>

            <tbody>
            { elements }
            </tbody>
        </table>
    )
}