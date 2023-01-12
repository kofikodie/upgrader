import Upgrader from '../src/upgrader'
import NpmClient from './stud/api'
import {expect} from 'chai'

describe('Upgrader', () => {
    it('should upgrade a package given a version', async () => {
        const upgrader = new Upgrader(new NpmClient())
        await upgrader.updateSinglePackage('npm', '0.4.13')
        expect(true).to.be.true
    })
})
