import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [addedContents, setAddedContents] = useState(
        { 'booking' :
        
        [
        {
            val: 'booking_area_pemakaman',
            id : [
                
            ],
        },
        {
            val: 'perlengkapan_pemakaman',
            id : [],
        },
        {
            val: 'sarana_prasarana_pemakaman',
            id : [],
        },
        {
            val: 'pengurus_jenazah',
            id : {
                id: [],
                total: 0
            }
        },
        {
            val: 'upacara_pemakaman',
            id : {
                id: [],
                total: 0
            },
        },
        {
            val: 'acara_peringatan',
            id : {
                id: [],
                total: 0,
                alamat_lengkap: '',
                kecamatan: '',
                kota: '',

            },
        },
        {
            val: 'perawatan_makam',
            id : {
                id: [],
                total: 0,
                alamat_lengkap: '',
                kecamatan: '',
                kota: '',
            },
        },
        {
            val: 'konseling_mental',
            id : {
                id:[],
                date: '',
                rangetime: '',
                contact: '',
                notes: ''
            },
        }
    ],
    'serviceuser' : {
        contact: '',
        name: '',
        address: '',
        district: '',
        city: '',
        notes: ''
    }

}, 

);


    return (
        <BookingContext.Provider value={{ addedContents, setAddedContents }}>
            {children}
        </BookingContext.Provider>
    );
};


