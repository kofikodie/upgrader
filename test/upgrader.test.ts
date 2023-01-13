import Upgrader from '../src/upgrader'
import NpmClient from './stud/api'
import {expect} from 'chai'

describe('Upgrader', async () => {
    it('should upgrade a package given a version', async () => {
        const upgrader = new Upgrader(new NpmClient())
        const res = await upgrader.updateSinglePackage('npm', '0.4.13')

        expect(res.status).to.equal('UPDATED')
    })
})
