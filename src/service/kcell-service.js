export default class SwapiService {

    _apiBase = 'https://digitalagent.vpbx.kcell.kz/sys/crm_api.wcgp';
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    }
  
    async getAllPeople() {
      const res = await this.getResource(`/history/`);
      return res.results;
    }
  
    
  }
  