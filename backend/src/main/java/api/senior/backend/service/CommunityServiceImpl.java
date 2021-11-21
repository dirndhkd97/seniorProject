package api.senior.backend.service;

import api.senior.backend.mapper.CommunityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    private CommunityMapper communityMapper;

    @Override
    public Map<String, Object> searchCommunityList(HashMap<String, Object> params) throws Exception {
        Map<String, Object> result = new HashMap<>();
        HashMap<String, Object> searchParams =  (HashMap<String, Object>)params.get("searchParams");
        Map<String, Object> pagingInfo = (Map<String, Object>)params.get("pagingInfo");

        searchParams.put("startCnt", pagingInfo.get("startCnt"));
        searchParams.put("pageListCnt"  , pagingInfo.get("pageListCnt"));

        result.put("communityList", communityMapper.selectCommunityList(searchParams));
        result.put("totCnt" , communityMapper.selectCommunityListCnt(searchParams));

        return result;
    }

    @Override
    public Map<String, Object> searchCommunityInfo(HashMap<String, Object> params) throws Exception {
        return communityMapper.selectCommunityInfo(params);
    }

    @Override
    public int removeCommunity(HashMap<String, Object> params) throws Exception {
        return communityMapper.deleteCommunity(params);
    }

    @Override
    public int registCommunity(HashMap<String, Object> params) throws Exception {
        HashMap<String, Object> communityInfo = (HashMap<String, Object>)params.get("communityInfo");
        return communityMapper.insertCommunity(communityInfo);
    }

    @Override
    public int modifyCommunity(HashMap<String, Object> params) throws Exception {
        HashMap<String, Object> communityInfo = (HashMap<String, Object>)params.get("communityInfo");
        return communityMapper.updateCommunity(communityInfo);
    }
}
