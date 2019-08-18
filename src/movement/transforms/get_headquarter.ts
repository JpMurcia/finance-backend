export const transformGetHeadquarter = (data) => {
    console.log(data);
    return data.map(item => ({
        id: item.id,
        name: item.name,
        lastname: item.lastname,
        phone: item.phone,
        email: item.email,
        grade: item.grade,
        workingDay: item.workingDay,
        headquarter: {
            id: item.idHeadquarter,
            name: item.nameHeadquarter
        }
    }))
}