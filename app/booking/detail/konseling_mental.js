import { Text, View, Pressable, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useBooking } from '../booking-context';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { supabase } from '../../../lib/supabase';


export default function Konseling_mental() {
    const nav = useNavigation();

    const [selectedVariants, setSelectedVariants] = useState([]);

    const [date, setDate] = useState(dayjs());
    const [rangetime, setRangetime] = useState('');

    const [open, setOpen] = useState(false);

    const [contact, setContact] = useState('');

    const [notes, setNotes] = useState('');

    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data from database...');
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('kategori', 'konseling_mental');

            if (error) {
                console.error(error);
            } else {
                const newContent = [];
                if (data.length > 0) {
                    const item = data[0];
                    const variants = item.varian.split(', ');
                    const prices = item.harga.split(', ');

                    const newVariants = variants.map((variant, index) => ({
                        id: index,
                        name: variant,
                        price: parseInt(prices[index], 10)
                    }));


                    newContent.push({
                        id: item.id,
                        name: item.nama,
                        range_price: 'Rp ' + Math.min(...prices).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' - Rp ' + Math.max(...prices).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                        description: item.deskripsi,
                        img_url: item.img_url,
                        variants: newVariants
                    });
                }
                setContent(newContent);
            }
        };

        fetchData();
    }, []);

    
    const handleSelectVariant = (id, name) => {
        setSelectedVariants(prevState => {
            const index = prevState.findIndex(variant => variant.id === id);
            if (index > -1) {
                // Remove the variant if it's already selected
                return prevState.filter(variant => variant.id !== id);
            } else {
                // Add the variant if it's not selected
                return [...prevState, { id, name }];
            }
        });
    };

    const { addedContents, setAddedContents } = useBooking();

    const handleAddContents = () => {
        // Copy the current state of addedContents
        const newContents = {...addedContents};
        const index = newContents['booking'].findIndex(x => x.val === "konseling_mental");
        // Push new variant to array
        newContents['booking'][index].id.id = selectedVariants.map(variant => variant.id);
        newContents['booking'][index].id.date = date;
        newContents['booking'][index].id.rangetime = rangetime;
        newContents['booking'][index].id.contact = contact;
        newContents['booking'][index].id.notes = notes;
        

        // Set new state
        setAddedContents(newContents);
        setSelectedVariants([]);
        nav.navigate('options');
    };

    return (
        content === null ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
            <ActivityIndicator size="large" color={colors.background} />
        </View> 
        :
        <View style={style.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                <Icon
                    color={colors.surfacecontainer}
                    name="west"
                    size={24}
                    type="material"
                    style={{ alignSelf: 'flex-start', marginRight: 10 }}
                    onPress={() => nav.goBack()}
                />
                <Text style={style.h1}>Konseling Mental</Text>
            </View>
            <Image source={require('./../../../assets/after-bg-secondary.png')} style={{ position: 'absolute', top: 60, justifyContent: 'center', alignSelf: 'center', marginBottom: 24, width: '90%', height: 174, overflow: 'hidden', zIndex: -1 }} />
            <Image source={{ uri: content[0].img_url }} style={{ width: 200, height: 149, alignSelf: 'center', borderRadius: 20 }} />
            <ScrollView style={{ ...style.scrollable, flex: 1 }} nestedScrollEnabled={true}>
                <View style={{ padding: 20 }}>
                    <Text style={{ ...style.h1, color: colors.onsurface }}>{content[0].name}</Text>
                    <Text style={{ ...style.text, marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 20 }}>{content[0].description}</Text>
                    <View style={{...style.input, paddingBottom: 20, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 20}}>
                        <Text style={{ ...style.text,  paddingBottom: 10, width: '100%'}}>
                            Pilih Jadwal
                        </Text>
                        
                        <Pressable style={{alignItems: 'center', flexDirection:'row',width: '100%', height: 60, borderColor: colors.outlinevariant, borderWidth: 1, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 16}}
                        onPress={() => setOpen(!open)}
                        >
                         
                            <Text style={{opacity: 0.65, fontSize: 16}}>Pilih Jadwal</Text>
                            <Icon
                                color={colors.onsurface}
                                name="calendar-month"
                                size={24}
                                type="material"
                                style={{ alignSelf: 'flex-start', marginRight: 10, opacity: 0.65 }}
                            />
                        </Pressable>
                        {open ? (
                        <View style={{marginTop: 5, padding: 9, ...style.schedule}} nestedScrollEnabled={true}>
                        <DateTimePicker
                            mode="single"
                            date={date}
                            onChange={(params) => setDate(params.date)}
                            minDate={new Date().getDate()}
                            isVisible={false}
                        />   
                        <View style={{width: '90%', paddingLeft: 10}}>
                        <Text style={{marginBottom: 10}}>Input range time</Text>
                        <TextInput
                            placeholder="ex.: 18.00 - 20.00"
                            value={rangetime}
                            onChangeText={setRangetime}
                            style={{...style.inputBox, marginBottom: 20, width: '100%'}}
                        />
                        </View>
                        </View>
                        ) : null}
                        
                    </View>
                    <View style={{...style.input, paddingBottom: 20, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 20}}>
                        <Text style={{ ...style.text,  paddingBottom: 10, width: '100%'}}>
                            Input kontak yang bisa dihubungi
                        </Text>
                           
                        <TextInput
                            placeholder="Email atau Nomor Telepon"
                            value={contact}
                            onChangeText={setContact}
                            style={{...style.inputBox, width: '100%', marginBottom: 20}}
                           
                        />
                    </View>
                    <Text style={{ ...style.text,  width: '100%'}}>
                            Preferensi
                        </Text>
                    {content[0].variants.map((item, index) => (
                        <View key={index}>
                            <Pressable style={{ ...style.option, marginTop: 10 }}
                                onPress={() => handleSelectVariant(item.id, item.name)}
                            >
                                {selectedVariants.some(variant => variant.id === item.id) ? (
                                    <Icon
                                        color={colors.primary}
                                        name="check-box"
                                        size={24}
                                        type="material"
                                        style={{ alignSelf: 'flex-start', marginRight: 10 }}
                                    />
                                ) : (
                                    <Icon
                                        color={colors.onsurfacevariant}
                                        name="check-box-outline-blank"
                                        size={24}
                                        type="material"
                                        style={{ alignSelf: 'flex-start', marginRight: 10 }}
                                    />
                                )}

                                <View>
                                    <Text style={style.text}>{item.name}</Text>
                                    
                                </View>
                            </Pressable>
                        </View>
                    ))}
                    <View style={{...style.input, paddingTop: 20, borderTopWidth: 1, borderColor: colors.outlinevariant}}>
                        <Text style={{ ...style.text,  paddingBottom: 10, width: '100%'}}>
                            Input catatan untuk sesi konseling (opsional)
                        </Text>
                           
                        <TextInput
                            placeholder="Catatan"
                            value={notes}
                            onChangeText={setNotes}
                            style={{...style.inputBox, width: '100%', marginBottom: 20}}
                           
                        />
                    </View>
                </View>
                {date != '' && rangetime != '' && contact != '' ? (
                    <View style={{ height: 100 }}></View>
                ) : null}
            </ScrollView>
            { date != '' && rangetime != '' && contact != '' ? (
                <View style={{
                    bottom: 0, zIndex: 100, position: 'absolute', width: '100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 15, marginTop: 10 }}>
                        <Text style={{ ...style.text, fontWeight: 600 }}></Text>
                    </View>
                    <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom: 25 }}
                        onPress={handleAddContents}>
                        <Text style={{ color: colors.surfacecontainer, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Tambahkan</Text>
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
}

const style = {
    container: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    h1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: colors.surfacecontainer
    },
    scrollable: {
        backgroundColor: colors.surfacecontainer,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        height: '100%',
    },
    text: {
        color: colors.onsurfacevariant,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        marginHorizontal: 10
    },
    option: {
        height: 70,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: colors.surfacecontainer,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: colors.onsurface,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdown:{
        height: 60,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: colors.surfacecontainer,
        borderRadius: 15,
        marginBottom: 15,
        borderColor: colors.outlinevariant,
        borderWidth: 1,
    },
    input: {
        
        alignItems: 'center',
        marginBottom: 16,
        marginHorizontal: 10
    },inputBox: {
        height: 60,
        borderColor: colors.outlinevariant,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingLeft: 16,
        fontSize: 16,
    },
        schedule: {
            height: 470,
            width: '95%',
            backgroundColor: colors.surfacecontainer,
            borderRadius: 15,
            marginBottom: 15,
            shadowColor: colors.onsurface,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        }
};

