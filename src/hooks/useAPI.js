import md5 from "md5";
import { useHttp } from "./useHttp";

const useAPI = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://api.valantis.store:41000/';
    const _apiKey = 'Valantis';
    const _timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
    const _baseOffset = 0;
    const _baseLimit = 3;
    const _header = {
        'Content-Type' : 'application/json',
        'X-Auth': md5(`${_apiKey}_${_timestamp}`)
    }

    const getIds = async (offset = _baseOffset, limit = _baseLimit) => {
        const res = await request(_apiBase, 'POST', JSON.stringify({
            "action": "get_ids",
            "params": {"offset": offset, "limit": limit}
        }), _header);
        return res.result;
    }

    const getItems = async (ids) => {
        const res = await request(_apiBase, 'POST', JSON.stringify({
            "action": "get_items",
            "params": {"ids": ids}
        }), _header);
        return res.result;
    }

    const getFields = async (offset = _baseOffset, limit = _baseLimit, field) => {
        const res = await request(_apiBase, 'POST', JSON.stringify({
            "action": "get_fields",
            "params": {"field": field, "offset": offset, "limit": limit}
        }), _header);
        return res.result;
    }

    const filter = async (activeFilter) => {
        const res = await request(_apiBase, 'POST', JSON.stringify({
            "action": "filter",
            "params": activeFilter
        }), _header);
        return res.result;
    }

    return {
        getIds,
        getItems,
        getFields,
        filter,
        clearError,
        process,
        setProcess
    }
}

export default useAPI;