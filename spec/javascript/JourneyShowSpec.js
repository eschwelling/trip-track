import JourneyShow from '../../app/javascript/react/components/JourneyShow'
import NoteContainer from '../../app/javascript/react/components/NoteContainer'
import NoteTile from '../../app/javascript/react/components/NoteTile'
import DurationPrediction from '../../app/javascript/react/components/DurationPrediction'
import DurationPredictionTile from '../../app/javascript/react/components/DurationPredictionTile'
import JourneyChart from '../../app/javascript/react/components/JourneyChart'

import fetchMock from 'fetch-mock'



describe('Journey Show renders Duration Prediction Tiles, Notes and Journey Chart', () => {
  let props = {id: 23};
  let journeyData;
  let tripsData;
  let chartData;
  let noteData;
  let wrapper;

  beforeEach(() => {

    journeyData = {
      "journey":
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
        }
      }

    noteData = {
      "journey":
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
        }
      }


      tripsData = {
        "trips": [
          {
            "id": 315,
            "arrival": "2018-11-06T14:42:12-05:00",
            "departure": "2018-11-06T15:15:12-05:00",
            "total_trip_time": 33,
            "journey":
              {
                "id": 23,
                "origin_id": 1330,
                "destination_id": 7302,
                "line_id": 36,
                "user_id": 1,
                "direction_id": 1
              }
          },
          {
            "id": 316,
            "arrival": "2018-11-06T14:41:22-05:00",
            "departure": "2018-11-06T15:14:22-05:00",
            "total_trip_time": 33,
            "journey":
              {
                "id": 23,
                "origin_id": 1330,
                "destination_id": 7302,
                "line_id": 36,
                "user_id": 1,
                "direction_id": 1
              }
          },
          {
            "id": 317,
            "arrival": "2018-11-06T14:41:22-05:00",
            "departure": "2018-11-06T15:14:22-05:00",
            "total_trip_time": 33,
            "journey":
              {
                "id": 23,
                "origin_id": 1330,
                "destination_id": 7302,
                "line_id": 36,
                "user_id": 1,
                "direction_id": 1
              }
            }
          ]
        }

      chartData = {
        "trips": [
          {
            "id": 315,
            "arrival": "2018-11-06T14:42:12-05:00",
            "departure": "2018-11-06T15:15:12-05:00",
            "total_trip_time": 33,
            "journey":
              {
                "id": 23,
                "origin_id": 1330,
                "destination_id": 7302,
                "line_id": 36,
                "user_id": 1,
                "direction_id": 1
              }
          },
          {
            "id": 316,
            "arrival": "2018-11-06T14:41:22-05:00",
            "departure": "2018-11-06T15:14:22-05:00",
            "total_trip_time": 33,
            "journey":
              {
                "id": 23,
                "origin_id": 1330,
                "destination_id": 7302,
                "line_id": 36,
                "user_id": 1,
                "direction_id": 1
              }
          },
          {
            "id": 317,
            "arrival": "2018-11-06T14:41:22-05:00",
            "departure": "2018-11-06T15:14:22-05:00",
            "total_trip_time": 33,
            "journey":
              {
                "id": 23,
                "origin_id": 1330,
                "destination_id": 7302,
                "line_id": 36,
                "user_id": 1,
                "direction_id": 1
              }
            }
          ]
        }

  fetchMock.get(`/api/v1/journeys/${props.id}`, {
    status: 200,
    body: journeyData
  })

  fetchMock.get(`/api/v1/journeys/${props.id}`, {
    status: 200,
    body: noteData
  })

  fetchMock.get(`/api/v1/journeys/${props.id}/trips`, {
    status: 200,
    body: tripsData
  })

  fetchMock.get(`/api/v1/journeys/${props.id}/trips`, {
    status: 200,
    body: chartData
  })


    wrapper = mount(
      <JourneyShow
        params = {{ id: 23 }}
      />
    );
  });

  afterEach(fetchMock.restore)
    it('should render Journey information', (done) => {
      setTimeout(() => {
        console.log(wrapper.debug())
        expect(wrapper.find('h1')).toBePresent()
        expect(wrapper.find('h1').last().text()).toEqual("destination: E Broadway @ L St");
        done()
      }, 0)
    })

    it('should render journey chart', (done) => {
      setTimeout(() => {
        expect(wrapper.find(JourneyChart)).toBePresent()
        done()
      }, 0)
    })

    it('should render note tiles', (done) => {
      setTimeout(() => {
          expect(wrapper.find(NoteTile)).toBePresent()
          expect(wrapper.find('h5').at(1).text()).toEqual("long lines today! good trip tho.")
          done()
      }, 0)
    })

    it('should render duration predictions', (done) => {
      setTimeout(() => {
          expect(wrapper.find(DurationPrediction)).toBePresent()
          done()
      }, 0)
    })
  })
