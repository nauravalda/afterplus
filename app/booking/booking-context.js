import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [addedContents, setAddedContents] = useState([
        {
            val: 'booking_area_pemakaman',
            id : [
                {
                    id: 1,
                    desc: 'Makam Tunggal',
                    price: 1000000
                },
                {
                    id: 3,
                    desc: 'Makam Keluarga',
                    price: 2000000
                }
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
            id : [],
        },
        {
            val: 'upacara_pemakaman',
            id : [],
        },
        {
            val: 'acara_peringatan',
            id : [],
        },
        {
            val: 'perawatan_makam',
            id : [],
        },
        {
            val: 'konseling_mental',
            id : [],
        }
    ]);

    return (
        <BookingContext.Provider value={{ addedContents, setAddedContents }}>
            {children}
        </BookingContext.Provider>
    );
};
