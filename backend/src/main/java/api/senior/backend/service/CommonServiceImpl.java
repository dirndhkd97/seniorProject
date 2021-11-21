package api.senior.backend.service;

import api.senior.backend.mapper.CommonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class CommonServiceImpl implements CommonService {

    @Autowired
    private CommonMapper commonMapper;

    @Override
    public Map<String, Object> login(HashMap<String, Object> params) throws Exception {
        Map<String, Object> result = new HashMap<>();
        String code = "999";

        Map<String, Object> mberInfo = commonMapper.selectMberInfo(params);

        if (mberInfo == null) {
            code = "901";
        } else {
            result.put("mberInfo" , mberInfo);
            code = "000";
        }

        result.put("code",code);
        return result;
    }

}
