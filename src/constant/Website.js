const remarks = [
    {name:'Excellent'},
    {name:'Very Good'},
    {name:'Good'},
    {name: 'Average'},
    {name:'Poover'}
];

export const UserInterFace = {
    result:{
        inputs:[
            {data: 'Roll Number', type: 'text', required: true,  style:'width: 100%; margin-top: 10px', name: 'Sub_Name',  feildtype:'input', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            
        ],
        title:'Result',
        description:'Result'
    },
    Contact:{
        menuitems:[
            {
                name:'حکيم الامت دارالعلوم (اوله څانګه)',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/1',
            },
            {
                name:'حکيم الامت دارالعلوم (دوهمه څانګه)',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/2',
            },
            {
                name:'حکيم الامت دارالحفاظ',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/3',
            },
            {
                name:'حکيم الامت دارالایتام',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/4',
            },
            {
                name:'حکيم الامت خصوصي ښوونځی',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/5',
            },

        ]
    },
    Branch:{
        Branchitems:[
            {
                id: 1,
                logo:'/images/logos/Logo.png',
                name:'حکيم الامت دارالعلوم (اوله څانګه)',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'madrasa@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'حکيم الامت دارالعلوم (اوله څانګه)',
            },
            {
                id: 2,
                logo:'/images/logos/Logo.png',
                name:'حکيم الامت دارالعلوم (دوهمه څانګه)',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'madrasa@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'حکيم الامت دارالعلوم (دوهمه څانګه)',
            },
            {
                id: 3,
                logo:'/images/logos/Logo.png',
                name:'حکيم الامت دارالحفاظ',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'madrasa@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'حکيم الامت دارالحفاظ',
            },
            {
                id: 4,
                logo:'/images/logos/Logo.png',
                name:'حکيم الامت دارالایتام',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'madrasa@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'حکيم الامت دارالایتام',
            },
            {
                id: 5,
                logo:'/images/logos/Logo.png',
                name:'حکيم الامت خصوصي ښوونځی',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'madrasa@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'حکيم الامت خصوصي ښوونځی',
            },
        ]
    }
}