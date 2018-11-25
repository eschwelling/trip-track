import FormMasterComponent from '../../app/javascript/react/components/FormMasterComponent'
import JourneySelectionForm from '../../app/javascript/react/components/JourneySelectionForm'
import JourneyTile from '../../app/javascript/react/components/JourneyTile'
import DirectionSelector from '../../app/javascript/react/components/DirectionSelector'
import LineForm from '../../app/javascript/react/components/LineForm'
import OriginForm from '../../app/javascript/react/components/OriginForm'
import DestinationForm from '../../app/javascript/react/components/DestinationForm'
import fetchMock from 'fetch-mock'


describe('FormMasterComponent renders Journey Tiles', () => {
  let journeysData;
  let linesData;
  let userData;
  let wrapper;

  beforeEach(() => {
  journeysData = {
    "journeys": [
      {
        "id": 23,
        "origin_id": 1330,
        "destination_id": 7302,
        "line_id": 36,
        "user_id": 1,
        "direction_id": 1,
        "origin": {
          "id": 1330,
          "mbta_id": 10015,
          "name": "Harrison Ave @ E Newton St",
          "description": null,
          "address": null,
          "latitude": "42.337402",
          "longitude": "-71.072162",
          "platform_name": null,
          "created_at": "2018-11-05T00:57:49.990Z",
          "updated_at": "2018-11-05T00:57:49.990Z"
        },
        "destination": {
          "id": 7302,
          "mbta_id": 25,
          "name": "E Broadway @ L St",
          "description": null,
          "address": null,
          "latitude": "42.335567",
          "longitude": "-71.03554",
          "platform_name": null,
          "created_at": "2018-11-05T00:58:07.664Z",
          "updated_at": "2018-11-05T00:58:07.664Z"
        },
        "line": {
          "id": 36,
          "name": "City Point - Copley via Boston Medical Center",
          "short_name": "10",
          "description": "Local Bus",
          "mbta_id": "10",
          "created_at": "2018-11-05T00:57:45.322Z",
          "updated_at": "2018-11-05T00:57:45.322Z"
        },
        "user": {
          "id": 1,
          "email": "test@test.org",
          "first_name": "test",
          "last_name": "test",
          "user_name": "test1",
          "profile_photo": {
            "url": null
            },
          "role": "f",
          "created_at": "2018-11-05T01:00:09.031Z",
          "updated_at": "2018-11-07T18:37:24.930Z"
        },
        "trips": [
          {
          "id": 315,
          "arrival": "2018-11-06T14:42:12-05:00",
          "departure": "2018-11-06T15:15:12-05:00",
          "total_trip_time": 33
          },
          {
          "id": 316,
          "arrival": "2018-11-06T14:41:22-05:00",
          "departure": "2018-11-06T15:14:22-05:00",
          "total_trip_time": 33
          },
          {
          "id": 317,
          "arrival": "2018-11-06T14:41:22-05:00",
          "departure": "2018-11-06T15:14:22-05:00",
          "total_trip_time": 33
          }
        ],
        "notes": [
          {
          "date": "November 11 18 02:43PM",
          "body": "long lines today! good trip tho.",
          "user_id": 1,
          "photo_path": {
            "url": "https://trip-track-eis-dev.s3.amazonaws.com/uploads/note/photo_path/42/IMG_3188.jpg"
            }
          }
        ]
      },
      {
        "id": 27,
        "origin_id": 4354,
        "destination_id": 2989,
        "line_id": 71,
        "user_id": 1,
        "direction_id": 0,
        "origin": {
          "id": 4354,
          "mbta_id": 1860,
          "name": "Walter St @ Hewlett St",
          "description": null,
          "address": null,
          "latitude": "42.288963",
          "longitude": "-71.134177",
          "platform_name": null,
          "created_at": "2018-11-05T00:57:58.716Z",
          "updated_at": "2018-11-05T00:57:58.716Z"
          },
        "destination": {
          "id": 2989,
          "mbta_id": 642,
          "name": "Washington St @ Tollgate Way",
          "description": null,
          "address": null,
          "latitude": "42.296255",
          "longitude": "-71.117613",
          "platform_name": null,
          "created_at": "2018-11-05T00:57:54.823Z",
          "updated_at": "2018-11-05T00:57:54.823Z"
          },
        "line": {
          "id": 71,
          "name": "Reservoir - Forest Hills",
          "short_name": "51",
          "description": "Local Bus",
          "mbta_id": "51",
          "created_at": "2018-11-05T00:57:45.437Z",
          "updated_at": "2018-11-05T00:57:45.437Z"
        },
        "user": {
          "id": 1,
          "email": "test@test.org",
          "first_name": "test",
          "last_name": "test",
          "user_name": "test1",
          "profile_photo": {
            "url": null
            },
          "role": "f",
          "created_at": "2018-11-05T01:00:09.031Z",
          "updated_at": "2018-11-07T18:37:24.930Z"
        },
        "trips": [
          {
            "id": 2,
            "arrival": "2018-11-04T23:18:49-05:00",
            "departure": "2018-11-04T23:28:49-05:00",
            "total_trip_time": 10
          },
          {
            "id": 5,
            "arrival": "2018-11-05T07:30:11-05:00",
            "departure": "2018-11-05T07:50:47-05:00",
            "total_trip_time": 20.6
          },
          {
            "id": 16,
            "arrival": "2018-11-05T08:11:11-05:00",
            "departure": "2018-11-05T08:32:11-05:00",
            "total_trip_time": 21
          }],
        notes: [
            {
              "date": "November 11 18 02:43PM",
              "body": "what a disaster.",
              "user_id": 1,
              "photo_path": {
                "url": "https://trip-track-eis-dev.s3.amazonaws.com/uploads/note/photo_path/42/IMG_3188.jpg"
              }
            }
          ]
        }
      ]
    }
    linesData = [
      {
      "id": 1,
      "name": "Red Line",
      "short_name": "",
      "description": "Rapid Transit",
      "mbta_id": "Red",
      "created_at": "2018-11-05T00:57:45.212Z",
      "updated_at": "2018-11-05T00:57:45.212Z"
      },
      {
      "id": 2,
      "name": "Mattapan Trolley",
      "short_name": "",
      "description": "Rapid Transit",
      "mbta_id": "Mattapan",
      "created_at": "2018-11-05T00:57:45.217Z",
      "updated_at": "2018-11-05T00:57:45.217Z"
      },
      {
      "id": 3,
      "name": "Orange Line",
      "short_name": "",
      "description": "Rapid Transit",
      "mbta_id": "Orange",
      "created_at": "2018-11-05T00:57:45.220Z",
      "updated_at": "2018-11-05T00:57:45.220Z"
      },
      {
      "id": 4,
      "name": "Green Line B",
      "short_name": "B",
      "description": "Rapid Transit",
      "mbta_id": "Green-B",
      "created_at": "2018-11-05T00:57:45.223Z",
      "updated_at": "2018-11-05T00:57:45.223Z"
      },
      {
      "id": 5,
      "name": "Green Line C",
      "short_name": "C",
      "description": "Rapid Transit",
      "mbta_id": "Green-C",
      "created_at": "2018-11-05T00:57:45.226Z",
      "updated_at": "2018-11-05T00:57:45.226Z"
      }
    ]
    userData = {
        "id": 1,
        "email": "test@test.org",
        "first_name": "test",
        "last_name": "test",
        "user_name": "test1",
        "profile_photo": {
        "url": null
        },
        "role": "f",
        "created_at": "2018-11-05T01:00:09.031Z",
        "updated_at": "2018-11-07T18:37:24.930Z"
      }

  fetchMock.get('/api/v1/journeys', {
    status: 200,
    body: journeysData
  })

  fetchMock.get('/api/v1/lines', {
    status: 200,
    body: linesData
  })

  fetchMock.get('/api/v1/users', {
    status: 200,
    body: userData
  })
    wrapper = mount(
      <FormMasterComponent/>
    );
  });


  afterEach(fetchMock.restore)

    it('should render form master component headers', (done) => {
      setTimeout(() => {
        expect(wrapper.find('h1')).toBePresent()
        expect(wrapper.find('h1').first().text()).toEqual("Please select your commute");
        expect(wrapper.find('h1').last().text()).toEqual("Your Commutes:");
        done()
      }, 0)
    })

    it('should render the journey selection form', (done) => {
      setTimeout(() => {
        expect(wrapper.find(JourneySelectionForm)).toBePresent()
        expect(wrapper.find(DirectionSelector)).toBePresent()
        expect(wrapper.find(LineForm)).toBePresent()
        expect(wrapper.find(OriginForm)).toBePresent()
        expect(wrapper.find(DestinationForm)).toBePresent()

        let directionSelector = wrapper.find('select').at(1).text()
        expect(directionSelector.includes("Inbound")).toEqual(true)
        expect(directionSelector.includes("Outbound")).toEqual(true)
        done()
      }, 0)
    })

    it('should render a journey tile component', (done) => {
      setTimeout(() => {
          // console.log(wrapper.debug())
          expect(wrapper.find(JourneyTile)).toBePresent()
          expect(wrapper.find('h3')).toBePresent()
          expect(wrapper.find('h3').first().text()).toEqual('City Point - Copley via Boston Medical Center - 10')
          expect(wrapper.find('h5').last().text()).toEqual('To: Washington St @ Tollgate Way')
          done()
      }, 0)
    })
  })
