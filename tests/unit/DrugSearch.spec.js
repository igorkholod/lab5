import { shallowMount } from '@vue/test-utils';
import DrugSearch from "../../src/components/DrugSearch";
let wrapper;

describe('DrugSearch test', () => {
  beforeEach(() => {
    wrapper = shallowMount(DrugSearch, {
      propsData: {
        search_term: 'unit_test_prop'
      },
      stubs: ['router-link']
    })
  })

  it('Check for correctly written prop',  () => {
    expect(wrapper.vm.$props.search_term).toBe('unit_test_prop')
  })

  it('Check for correct rendering \'not found\' message', () => {
    expect(wrapper.find('h1').text()).toBe('Sorry, we couldn\'t find anything with this term')
  })

  it('Check for rendering list when found result', async () => {
    await wrapper.setData({is_found: true})
    expect(wrapper.find('#main_div').exists()).toBe(true)
  })

  it('Check for correct number of rendered list items', async() => {
    const info = [
      {
        "id": 2,
        "name": "drugtest",
        "description": {
          "dosage_form": "test",
          "weight": 10
        },
        "image": "/media/images/no_image.webp"
      },
      {
        "id": 3,
        "name": "drugtest1",
        "description": {
          "dosage_form": "таблетки",
          "weight": 5
        },
        "image": "/media/images/no_image.webp"
      },
      {
        "id": 4,
        "name": "test",
        "description": {
          "dosage_form": "таблетки",
          "weight": 5
        },
        "image": "/media/images/no_image.webp"
      }
    ]

    await wrapper.setData({is_found: true, info: info})
    expect(wrapper.findAll('li').length).toBe(3)
  })

  it('Check for api call', async() => {
    await wrapper.vm.api_call.call()
    expect(wrapper.vm.$data.is_found).toBe(false)
  })
});
