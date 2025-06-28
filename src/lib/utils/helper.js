export const getStatusColor = (status) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800"
        case "Closed":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}