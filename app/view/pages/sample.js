import React, { useEffect, useState, useRef } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { Container, Header, Content, Body, Icon } from 'native-base'
import DropdownAlert from 'react-native-dropdownalert'
import Loading from 'components/Loading'
import apiData from 'store/data'
import appStyles from 'assets/styles'

const renderItem = ({ item }) => {
    const styles = appStyles.Sample
    return (
        <TouchableOpacity style={styles.flatListTouchableOpacity} onPress={console.log('You choosed!')}>
            <View style={styles.flatListView1}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.flatListView2}>
                    <Text style={styles.userNameText}>{item.userName}</Text>
                    <Text style={styles.fullNameText}>{item.fullName}</Text>
                </View>
                <Text style={styles.distanceText}>{item.distance}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Sample = props => {
    const dropdown = useRef(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const styles = appStyles.Sample

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                // Get data from API
                setTimeout(() => { setData(apiData); setLoading(false); }, 1500)
            } catch (error) {
                console.log(error)
                setLoading(false)
                dropdown.current.alertWithType('error', 'Error', 'Network error')
            }
        })()
    }, [])

    return loading ? (<Loading />) :
        (
            <Container style={{ flex: 1 }}>

                <Header style={styles.header} androidStatusBarColor='white' transparent={true}>
                    <Image source={require('assets/images/search-around.png')} style={styles.searchImage} />
                    <Body>
                        <View style={styles.bodyView}>
                            <Icon name="ios-search" style={styles.searchIcon} />
                            <TextInput
                                value={search}
                                onChangeText={search => setSearch(search)}
                                style={{ width: '90%', height: 40}}
                            />
                        </View>
                    </Body>
                    <TouchableOpacity onPress={() => setSearch('')}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </Header>

                <Content>
                    <Text style={styles.titleText}>People near you</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Content>

                <DropdownAlert
                    ref={dropdown}
                    containerStyle={styles.dropdownAlert}
                    titleStyle={styles.dropdownText}
                    messageStyle={styles.dropdownStyle}
                />

            </Container>
        )
}

export default Sample