export const Components = {
    uploadimage: {
        mainimageContainer:{
            width: '117px',
            height: '52px',
            position: "relative",
            background: '#ecf3ec',
            margin: '3px',
            marginTop: '11px',
            borderRadius: '7px',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#a4d3a6',
        },
        file:{
            opacity:'0',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: '2'
        },
        text:{
            position: 'absolute',
            opacity: '0',
            zIndex: '1',
            left: '45%',
        },
        imagePreviewContainer:{
            position: 'relative',
            width: 'fit-content',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            '&:before': {
                content: '""',
                width: '100%',
                height: '100%',
                background: 'black',
                background: '#0000003b',
                position: 'absolute',
                borderRadius: '11px'
            }
        },
        previewImage:{
            
        },
        button:{
            position: 'absolute'
        },
        imagePreviewmain:{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            width: 'fit-content',
            alignItems: 'center'
        }
    },
    teacherreoprt:{
        image:{
                width:'150px',
                height:'150px'
            
        }
    },
    dashboard:{
        box:{
            
            backgroundImage: 'url(/images/mountains/flower.png)',
            position: 'relative',



            // '&:before': {
            //     content: '""',
            //     background: 'white',
            //     position: 'absolute',
            //     zIndex: '1',
            //     width: '100%',
            //     height: '100%',

            //    },
            underbox:{
                minHeight: '150px',
                background: '#d5d5ff',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px',
                borderRadius: '22px',
                boxShadow: '0 0.25rem 2.5rem #0000001a',
                position: 'relative',
                zIndex: '2',
                background: '#a9a9ff87',
            }
        },
        icon:{
            width: '75px',
            position: 'relative',
            zIndex: '2',
            height: '75px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0.25rem 2.5rem #0000001a',

            icon:{
                fontSize: '35px'
            }
        }

    }
}