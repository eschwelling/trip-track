import FormMasterComponent from '../../app/javascript/react/components/FormMasterComponent'
import JourneySelectionForm from '../../app/javascript/react/components/JourneySelectionForm'
import JourneyTile from '../../app/javascript/react/components/JourneyTile'
import DirectionSelector from '../../app/javascript/react/components/DirectionSelector'
import LineForm from '../../app/javascript/react/components/LineForm'
import OriginForm from '../../app/javascript/react/components/OriginForm'
import DestinationForm from '../../app/javascript/react/components/DestinationForm'


describe('FormMasterComponent renders Journey Tiles', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = mount(
      <FormMasterComponent/>
    );
    console.log(wrapper.debug())
  });
    it('should render the journey selection form', (done) => {
      setTimeout(() => {
        expect(wrapper.find('h1')).toBePresent()
        expect(wrapper.find('h1').first().text()).toEqual("Please select your commute");
        expect(wrapper.find('h1').last().text()).toEqual("Your Commutes:");
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
  })
