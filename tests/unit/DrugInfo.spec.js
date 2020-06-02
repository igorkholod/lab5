import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router'
import DrugInfo from "../../src/components/DrugInfo";
let wrapper;

describe('DrugInfo test', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    wrapper = shallowMount(DrugInfo, {
      localVue,
      router,
      stubs: ['router-link']
    })
  })


  it('Check for correct rendering of \'not found\' message', () => {
    expect(wrapper.find('#header').text()).toBe('Drug does not exist')
  })

  it('Check for correct computing', () => {
    const localThis = {info: {description: {composition: '1\n2\n3'}}}
    expect(DrugInfo.computed.composition.call(localThis)).toStrictEqual(["1", "2", "3"])
  })

})
