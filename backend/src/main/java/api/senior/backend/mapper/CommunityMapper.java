package api.senior.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface CommunityMapper {
    public List<Map<String, Object>> selectCommunityList(HashMap<String,Object> params);
    public String selectCommunityListCnt(HashMap<String,Object> params);
    public Map<String, Object> selectCommunityInfo(HashMap<String,Object> params);
    public int deleteCommunity(HashMap<String,Object> params);
    public int insertCommunity(HashMap<String,Object> params);
    public int updateCommunity(HashMap<String,Object> params);
}
