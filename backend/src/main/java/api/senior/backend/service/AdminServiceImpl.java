package api.senior.backend.service;

import api.senior.backend.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Map<String, Object> searchMberList(HashMap<String, Object> params) throws Exception {
        Map<String, Object> result = new HashMap<>();
        HashMap<String, Object> searchParams =  (HashMap<String, Object>)params.get("searchParams");
        Map<String, Object> pagingInfo = (Map<String, Object>)params.get("pagingInfo");

        searchParams.put("startCnt", pagingInfo.get("startCnt"));
        searchParams.put("pageListCnt"  , pagingInfo.get("pageListCnt"));

        result.put("mberList", adminMapper.selectMberList(searchParams));
        result.put("totCnt" , adminMapper.selectMberListCnt(searchParams));

        return result;
    }

    @Override
    public Map<String, Object> searchMberInfo(HashMap<String, Object> params) throws Exception {
        return adminMapper.selectMberInfo(params);
    }

    @Override
    public String mberDplctChk(HashMap<String, Object> params) throws Exception {
        return adminMapper.selectMberDplctCnt(params);
    }

    @Override
    public int removeMber(HashMap<String, Object> params) throws Exception {
        return adminMapper.deleteMber(params);
    }

    @Override
    public int registMber(HashMap<String, Object> params) throws Exception {
        HashMap<String, Object> mberInfo = (HashMap<String, Object>)params.get("mberInfo");
        return adminMapper.insertMber(mberInfo);
    }

    @Override
    public int modifyMber(HashMap<String, Object> params) throws Exception {
        HashMap<String, Object> mberInfo = (HashMap<String, Object>)params.get("mberInfo");
        return adminMapper.updateMber(mberInfo);
    }

}
