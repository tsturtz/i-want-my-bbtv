import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Animated, Easing, ActivityIndicator } from 'react-native';
import { Text, Button, ListItem, Card, Icon, Rating } from 'react-native-elements';

import { theme } from '../theme';

const selections = [
  // TV
  {
    selection: 'tv_comedy',
    options: [
      'The Office',
      '30 Rock',
      'Parks and Recreation',
      'The Grinder',
      'Great News',
      'Unbreakable Kimmy Schmidt',
      'The Last Man on Earth',
      'Brooklyn 99',
      'The Simpsons',
      'Friends',
      'Seinfeld',
      'Santa Clarita Diet',
      'Curb Your Enthusiasm',
      'Kim\'s Convenience',
      'American Housewife',
      'The Good Place',
      'Arrested Development',
      'Daria',
    ],
  },
  {
    selection: 'tv_cooking',
    options: [
      'Chopped',
      'Worst Cooks in America',
      'Final Table',
      'Cutthroat Kitchen',
      'Nailed It',
    ],
  },
  {
    selection: 'tv_drama',
    options: [
      'Game of Thrones',
      'Lost',
      'Westworld',
      'The Blacklist',
      'Sherlock',
      'Jessica Jones',
    ],
  },
  // MOVIES
  {
    selection: 'movie_animated',
    options: [
      'Up',
      'Inside Out',
      'Toy Story',
      'Toy Story 2',
      'Toy Story 3',
      'Coco',
      'The Incredibles',
      'Incredibles 2',
      'Finding Nemo',
      'Finding Dora',
      'Wall-E',
      'Ratatouille',
      'Moana',
      'Zootopia',
      'Dispicable Me',
      'Dispicable Me 2',
      'Dispicable Me 3',
      'The Lion King',
      'The Jungle Book',
      'The Aristocats',
      'The Lady and the Tramp',
    ],
  },
  {
    selection: 'movie_comedy',
    options: [
      'The Birdcage',
      'Mrs. Doubtfire',
    ],
  },
  {
    selection: 'movie_drama',
    options: [
      'Jumanji',
    ],
  },
  {
    selection: 'movie_epic_saga',
    options: [
      'The Hobbit: An Unexpected Journey',
      'The Hobbit: The Battle of the Five Armies',
      'The Hobbit: The Desolation of Smaug',
      'The Lord of the Rings: The Fellowship of the Ring',
      'The Lord of the Rings: The Two Towers',
      'The Lord of the Rings: The Return of the King',
      'Star Wars: Episode I - The Phantom Menace',
      'Star Wars: Episode II - Attack of the Clones',
      'Star Wars: Episode III - Revenge of the Sith',
      'Star Wars: A New Hope',
      'Star Wars: The Empire Strikes Back',
      'Star Wars: Return of the Jedi',
      'Star Wars: The Force Awakens',
      'Star Wars: The Last Jedi',
      'Rogue One: A Star Wars Story',
      'Solo: A Star Wars Story',
      'Batman',
      'Back to the Future',
      'Back to the Future Part II',
      'Back to the Future Part III',
    ],
  },
  {
    selection: 'movie_rom_com',
    options: [
      'You\'ve Got Mail',
      'Sleepless in Seattle',
      'When Harry Met Sally',
      'Love Actually',
      'How to Lose a Guy in 10 Days',
      '10 Things I Hate About You',
      'Bridget Jones\'s Diary',
      'Pretty Woman',
      'Clueless',
      'Four Weddings and Funeral',
      'The Proposal',
      '13 Going on 30',
      'The Princess Bride',
      'The Bick Sick',
      '50 First Dates',
      'The Wedding Singer',
      'There\'s Something About Mary',
      'Hitch',
      '27 Dresses',
      'My Big Fat Greek Wedding',
      'Sweet Home Alabama',
      'He\'s Just Not That into You',
      'Forgetting Sarah Marshall',
      'Bridesmaids',
    ],
  },
  {
    selection: 'movie_scary',
    options: [
      'Bird Box',
      'Silence of the Lambs',
      'Hocus Pocus',
      'The Shining',
      'The Ring',
    ],
  },
  {
    selection: 'movie_suspense_thriller',
    options: [
      'Momento',
      'The Usual Suspects',
      '12 Monkeys',
      'Minority Report',
      'The Prestige',
    ],
  },
]

const suggestionText = [
  'How about...',
  '🤔 Hmm...',
  'You could watch...',
  'What do you say?',
  'Here\'s an option 👀',
  'Try this!',
]

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);

    const selected = selections.find((sel) => sel.selection === this.props.navigation.getParam('selectionValue', 'default_value')).options;
    const random = selected[Math.floor(Math.random() * selected.length)];

    this.state = {
      selectionValue: this.props.navigation.getParam('selectionValue', 'default_value'),
      selectionTitle: this.props.navigation.getParam('selectionTitle', 'Category'),
      selectionType: this.props.navigation.getParam('selectionType', 'Unknown'),
      selectedList: selected,
      randomItem: random,
      randomItemIndex: selected.indexOf(random),
      listAnimationComplete: false,
      selectedItemName: 'Not found',
      selectedItemImage: 'Not found',
      selectedItemOverview: 'Not found',
      selectedItemFirstAirDate: 'Not found',
      selectedItemVoteAverage: 0,
    };

    this.showList = new Animated.Value(1);
    this.showItem = new Animated.Value(0);
  }

  componentDidMount() {
    this.selectRandom();
  }

  count = 0;
  time = 5;
  selectRandom = (time = this.time) => {
    setTimeout(() => {
      const randomItem = this.state.selectedList[Math.floor(Math.random() * this.state.selectedList.length)];

      this.setState({ randomItem }, () => {
        this.scrollRef.scrollTo({
          y: (this.state.selectedList.indexOf(randomItem) * 54),
          animated: true,
        });
  
        if (this.count < 5) {
          this.count++;
          this.selectRandom(this.time)
        } else if (time < 50) {
          this.time = time + (time / 3);
          this.selectRandom(this.time)
        } else if (time < 100) {
          this.time = time + (time / 2);
          this.selectRandom(this.time);
        } else if (time < 200) {
          this.time = time * 2;
          this.selectRandom(this.time);
        } else {
          this.animate();
        }
      })
    }, time);
  }

  createAnimation = (value, toValue, duration, easing, delay = 0) => {
    return Animated.timing(
      value,
      {
        toValue,
        duration,
        easing,
        delay,
        useNativeDriver: true,
      }
    )
  }

  animate = () => {
    this.showList.setValue(1);
    this.showItem.setValue(0);
    Animated.sequence([
      this.createAnimation(this.showList, 0, 1000, Easing.ease),
    ]).start(() => {
      this.setState({ listAnimationComplete: true }, () => {
        this.initSelected(this.state.randomItem)
      })
    })
  }

  initSelected = async (item) => {
    try {
      let firstAirDate = 'N/A';
      if (this.state.selectionType === 'TV') {
        const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/search/tv${process.env.TMDB_API_KEY_PARAM}&query=${item}&page=1&language=en-US`)
        const json = await response.json()
        this.setSelectedState(json)
      } else if (this.state.selectionType === 'Movie') {
        const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/search/movie${process.env.TMDB_API_KEY_PARAM}&query=${item}&page=1&language=en-US&include_adult=false`)
        const json = await response.json()
        this.setSelectedState(json)
      }
    } catch (err) {
      console.warn(err)
    }
  }

  setSelectedState = (payload) => {
    if (payload && payload.results && payload.results[0]) {
      this.setState({
        selectedItemName: this.state.selectionType === 'TV' ? payload.results[0].name : payload.results[0].title,
        selectedItemImage: payload.results[0].backdrop_path,
        selectedItemOverview: payload.results[0].overview,
        selectedItemFirstAirDate: this.state.selectionType === 'TV' ? payload.results[0].first_air_date : payload.results[0].release_date,
        selectedItemVoteAverage: payload.results[0].vote_average,
      }, () => {
        Animated.sequence([
          this.createAnimation(this.showItem, 1, 1000, Easing.ease),
        ]).start()
      })
    } else {
      Animated.sequence([
        this.createAnimation(this.showItem, 1, 1000, Easing.ease),
      ]).start()
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('selectionType', 'Unknown')}: ${navigation.getParam('selectionTitle', 'Category')}`,
      headerStyle: { backgroundColor: theme.backgroundColor },
      headerTintColor: '#fff',
    }
  }

  render() {
    const {
      selectionType,
      randomItem,
      listAnimationComplete,
      selectedItemName,
      selectedItemImage,
      selectedItemOverview,
      selectedItemFirstAirDate,
      selectedItemVoteAverage,
    } = this.state;
    const { navigation, navigation: { navigate } } = this.props;

    return (
      <ScrollView
        ref={r => (this.scrollRef = r)}
        contentContainerStyle={listAnimationComplete ? {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        } : {}}
      >

        {!listAnimationComplete && (
          <Animated.View style={{ opacity: this.showList }}>
            {
              this.state.selectedList.map((option, idx) => {
                return (
                  <ListItem
                    key={idx}
                    title={option}
                    titleStyle={{ fontFamily: theme.bodyFont }}
                    bottomDivider
                    containerStyle={randomItem === option ? { backgroundColor: 'grey' } : {}}
                  />
                )
              })
            }
          </Animated.View>
        )}

        <Animated.View
          style={{
            opacity: this.showItem,
          }}
        >
          <Text style={{ fontFamily: theme.fancyFont, fontSize: 40, lineHeight: 40, padding: 10 }}>
            {suggestionText[Math.floor(Math.random() * suggestionText.length)]}
          </Text>
          <Card
            featuredTitle={selectedItemName}
            featuredTitleStyle={{ fontSize: 25 }}
            image={{ uri: `https://image.tmdb.org/t/p/w400${selectedItemImage}` }}
          >
            <Rating
              imageSize={20}
              readonly
              startingValue={selectedItemVoteAverage / 2}
              ratingCount={5}
            />
            <Text style={{ fontFamily: theme.bodyFont, fontSize: 20 }}>{selectedItemName}</Text>
            <Text style={{ fontFamily: theme.bodyFont, fontSize: 10, fontStyle: 'italic' }}>
              {selectionType === 'TV' ? 'First aired:' : 'Release date:'} {selectedItemFirstAirDate}
            </Text>
            <Text style={{ fontFamily: theme.bodyFont, fontSize: 14 }}>{selectedItemOverview}</Text>
          </Card>
          <Button
            buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, marginHorizontal: 15, marginVertical: 30 }}
            icon={<Icon name='chevron-left' color='#ffffff' />}
            title=' Back'
            onPress={() => { navigate('Home') }}
          />
        </Animated.View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});