import fetchMock from 'fetch-mock'
import FormMasterComponent from '../../../app/javascript/react/components/FormMasterComponent'
import LineForm from '../../../app/javascript/react/components/LineForm'
import DirectionSelector from '../../../app/javascript/react/components/DirectionSelector'
import OriginForm from '../../../app/javascript/react/components/OriginForm'
import DestinationForm from '../../../app/javascript/react/components/DestinationForm'
import JourneyTile from '../../../app/javascript/react/components/JourneyTile'


describe('FormMasterComponent', () => {
  let data,
      wrapper;

  beforeEach(() => {
  data = {
    journeys: [
      {
        id: 79,
        origin_id: 2218,
        destination_id: 4606,
        line_id: 37,
        user_id: 1,
        direction_id: 1,
        origin: {
          id: 2218,
          mbta_id: 11219,
          name: "A St @ Necco St",
          description: null,
          address: null,
          latitude: "42.348062",
          longitude: "-71.050338",
          platform_name: null,
          created_at: "2018-11-05T00:57:52.566Z",
          updated_at: "2018-11-05T00:57:52.566Z"
        },
        destination: {
          id: 4606,
          mbta_id: 266,
          name: "E 8th St @ M St",
          description: null,
          address: null,
          latitude: "42.331439",
          longitude: "-71.033352",
          platform_name: null,
          created_at: "2018-11-05T00:57:59.428Z",
          updated_at: "2018-11-05T00:57:59.428Z"
        },
        line: {
          id: 37,
          name: "City Point - Downtown Boston",
          short_name: "11",
          description: "Local Bus",
          mbta_id: "11",
          created_at: "2018-11-05T00:57:45.325Z",
          updated_at: "2018-11-05T00:57:45.325Z"
        },
        user: {
          id: 1,
          email: "test@test.org",
          first_name: "test",
          last_name: "test",
          user_name: "test1",
          profile_photo: {
            url: null
          },
          role: "f",
          created_at: "2018-11-05T01:00:09.031Z",
          updated_at: "2018-11-07T18:37:24.930Z"
        },
        trips: [
          {
            id: 3571,
            arrival: "2018-11-12T11:25:38-05:00",
            departure: "2018-11-12T11:38:25-05:00",
            total_trip_time: 12.783333333333333
          },
          {
            id: 3570,
            arrival: "2018-11-12T12:19:12-05:00",
            departure: "2018-11-12T12:33:12-05:00",
            total_trip_time: 14
          },
          {
            id: 3569,
            arrival: "2018-11-12T11:52:36-05:00",
            departure: "2018-11-12T12:10:42-05:00",
            total_trip_time: 18.1
          }
        ],
        notes: []
      },
      {
        id: 12,
        origin_id: 3143,
        destination_id: 5021,
        line_id: 37,
        user_id: 1,
        direction_id: 0,
        origin: {
          id: 3143,
          mbta_id: 277,
          name: "E 8th St @ M St",
          description: null,
          address: null,
          latitude: "42.331537",
          longitude: "-71.033111",
          platform_name: null,
          created_at: "2018-11-05T00:57:55.267Z",
          updated_at: "2018-11-05T00:57:55.267Z"
          },
        destination: {
          id: 5021,
          mbta_id: 15095,
          name: "Washington St @ Herald St",
          description: null,
          address: "Washington St and Herald St, Boston, MA",
          latitude: "42.345582",
          longitude: "-71.064848",
          platform_name: null,
          created_at: "2018-11-05T00:58:00.628Z",
          updated_at: "2018-11-05T00:58:00.628Z"
          },
        line: {
          id: 37,
          name: "City Point - Downtown Boston",
          short_name: "11",
          description: "Local Bus",
          mbta_id: "11",
          created_at: "2018-11-05T00:57:45.325Z",
          updated_at: "2018-11-05T00:57:45.325Z"
        },
        user: {
          id: 1,
          email: "test@test.org",
          first_name: "test",
          last_name: "test",
          user_name: "test1",
          profile_photo: {
              url: null
            },
          role: "f",
          created_at: "2018-11-05T01:00:09.031Z",
          updated_at: "2018-11-07T18:37:24.930Z"
        },
        trips: [
          {
            id: 2,
            arrival: "2018-11-04T23:18:49-05:00",
            departure: "2018-11-04T23:28:49-05:00",
            total_trip_time: 10
          },
          {
            id: 5,
            arrival: "2018-11-05T07:30:11-05:00",
            departure: "2018-11-05T07:50:47-05:00",
            total_trip_time: 20.6
          },
          {
            id: 6,
            arrival: "2018-11-05T07:35:49-05:00",
            departure: "2018-11-05T07:55:16-05:00",
            total_trip_time: 19.45
          },
          {
            id: 8,
            arrival: "2018-11-05T07:39:18-05:00",
            departure: "2018-11-05T07:59:18-05:00",
            total_trip_time: 20
          },
          {
            id: 14,
            arrival: "2018-11-05T08:10:31-05:00",
            departure: "2018-11-05T08:31:31-05:00",
            total_trip_time: 21
          },
          {
            id: 15,
            arrival: "2018-11-05T08:11:03-05:00",
            departure: "2018-11-05T08:32:03-05:00",
            total_trip_time: 21
          },
          {
            id: 16,
            arrival: "2018-11-05T08:11:11-05:00",
            departure: "2018-11-05T08:32:11-05:00",
            total_trip_time: 21
          }],
        notes: [
            {
              date: "November 11 18 02:43PM",
              body: "long lines today! good trip tho.",
              user_id: 1,
              photo_path: {
                url: "https://trip-track-eis-dev.s3.amazonaws.com/uploads/note/photo_path/42/IMG_3188.jpg"
              }
            }
        ]
      ]
    }
  }

  fetchMock.get('/api/v1/journeys/12', {
    status: 200,
    body: data
  })
    wrapper = mount(
      <FormMasterComponent
        params = {{ id: 12}}
      />
    );
  });

  afterEach(fetchMock.restore)
    it('should render form master component headers', (done) => {
      setTimeout(() => {
        expect(wrapper.find('h1')).toBePresent()
        expect(wrapper.find('h1').first().text()).toEqual("Please select your commute");
        expect(wrapper.find('h1').last().text()).toEqual("Your Commutes:");
        expect(wrapper.find('input').first().text()).toEqual("Choose Your Commute!");
        done()
      }, 0)
    })

    it('should render a journey tile component', (done) => {
      setTimeout(() => {
          expect(wrapper.find(JourneyTile)).toBePresent();
          expect(wrapper.find('h3')).toBePresent()
          expect(wrapper.find('h3').text()).toEqual('City Point - Downtown Boston - 11')
          done()
      }, 0)
    });
  });
